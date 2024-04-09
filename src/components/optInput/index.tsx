import React, {createRef, forwardRef, useEffect, useRef} from "react";
import type {MuiOtpInputProps} from './index.types'
import {Box, TextField, TextFieldProps, useEventCallback} from "@mui/material";
import {styled} from "@mui/material/styles";

// see https://github.com/viclafouch/mui-otp-input
export const KEYBOARD_KEY = {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    backspace: 'Backspace',
    home: 'Home',
    end: 'End'
}

function splitValueString<
    T extends (v: number, k: number) => unknown,
    Y extends ReturnType<T>
>(range: number, mapfn: T): Y[] {
    return range <= 0 ? [] : (Array.from({length: range}, mapfn) as Y[])
}

type ValueSplit = {
    character: string
    inputRef: React.RefObject<HTMLInputElement>
}[]

const TextFieldStyled = styled(TextField)`
    input {
        text-align: center;
    }
`
const TextFieldBox = (props: TextFieldProps) => {
    return <TextFieldStyled {...props} />
}

export function updateIndex<T extends unknown[]>(
    array: T,
    indexItem: number,
    item: T[keyof T]
): T {
    return array.map((chipItem, index) => {
        return indexItem === index ? item : chipItem
    }) as T
}

function joinArrayStrings(array: readonly string[]): string {
    return array.join('')
}

function append<T extends unknown[]>(array: T, item: T[keyof T]): T {
    return [...array, item] as T
}

function mergeArrayStringFromIndex(
    array: readonly string[],
    arrayToMerge: readonly string[],
    fromIndex: number
): string[] {
    return array.reduce(
        (accumulator, currentValue, index) => {
            const {characters, restArrayMerged} = accumulator

            if (index < fromIndex) {
                return {
                    restArrayMerged,
                    characters: append(characters, currentValue)
                }
            }

            const [firstCharacter, ...restArrayWithoutFirstCharacter] =
                restArrayMerged

            return {
                restArrayMerged: restArrayWithoutFirstCharacter,
                characters: append(characters, firstCharacter || '')
            }
        },
        {
            restArrayMerged: arrayToMerge,
            characters: [] as string[]
        }
    ).characters
}

function split(string: string): string[] {
    return string.split('')
}

const MuiOptInput = forwardRef<MuiOtpInputProps['ref'], MuiOtpInputProps>
((props, ref) => {
    const {
        value = '',
        length = 4,
        autoFocus = false,
        onChange,
        TextFieldsProps,
        onComplete,
        validateChar = () => true,
        className,
        onBlur,
        ...restBoxProps
    } = props

    const initialValue = useRef(value);

    const valueSplit: ValueSplit = splitValueString(
        length,
        (_, index) => {
            return {
                character: value[index] || '',
                inputRef: createRef<HTMLInputElement>()
            }
        }
    )
    const getCharactersSplit = () => {
        return valueSplit.map(({character}) => {
            return character
        })
    }


    const onCallbackEvent = useEventCallback(onComplete ?? (() => ""))

    const matchIsCompletedEvent = useEventCallback((filledStrings: string) => {
        const finalValue = filledStrings.slice(0, length)
        return {
            isCompleted: finalValue.length === length,
            finalValue
        }
    })
    const matchIsCharIsValid = (character: string, index: number) => {
        return typeof validateChar !== 'function'
            ? true
            : validateChar(character, index)
    }

    const selectInputByIndex = (inputIndex: number) => {
        valueSplit[inputIndex]?.inputRef.current?.select()
    }

    const getIndexByInputElement = (inputElement: HTMLInputElement) => {
        return valueSplit.findIndex(({inputRef}) => {
            return inputRef.current === inputElement
        })
    }

    const replaceCharOfValue = (charIndex: number, charValue: string) => {
        const newValueSplit = updateIndex(
            getCharactersSplit(),
            charIndex,
            charValue
        )
        return joinArrayStrings(newValueSplit)
    }

    const focusInputByIndex = (inputIndex: number) => {
        valueSplit[inputIndex]?.inputRef.current?.focus()
    }

    const manageCaretForNextInput = (currentInputIndex: number) => {
        if (currentInputIndex + 1 === length) {
            return
        }

        if (valueSplit[currentInputIndex + 1].character) {
            selectInputByIndex(currentInputIndex + 1)
        } else {
            focusInputByIndex(currentInputIndex + 1)
        }
    }

    const handleOneInputPaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
        const content = event.clipboardData.getData('text/plain')
        const inputElement = event.target as HTMLInputElement
        // Apply from where an input is empty or equal to the input selected
        const currentInputIndex = valueSplit.findIndex(
            ({character, inputRef}) => {
                return character === '' || inputRef.current === inputElement
            }
        )

        const currentCharacter = getCharactersSplit()

        const characters = mergeArrayStringFromIndex(
            currentCharacter,
            split(content),
            currentInputIndex
        ).map((character, index) => {
            return matchIsCharIsValid(character, index) ? character : ''
        })

        const newValue = joinArrayStrings(characters)
        onChange?.(newValue)

        const {isCompleted, finalValue} = matchIsCompletedEvent(newValue)

        if (isCompleted) {
            onComplete?.(finalValue)
            selectInputByIndex(length - 1)
        } else {
            selectInputByIndex(newValue.length)
        }
    }

    const handleOneInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentInputIndex = getIndexByInputElement(event.target)
        // Autofill from sms
        if (currentInputIndex === 0 && event.target.value.length > 1) {
            const {finalValue, isCompleted} = matchIsCompletedEvent(
                event.target.value
            )
            onChange?.(finalValue)

            if (isCompleted) {
                onComplete?.(finalValue)
            }

            selectInputByIndex(finalValue.length - 1)

            return
        }

        const initialChar = event.target.value[0] || ''
        let character = initialChar

        // handle backspace so check character
        if (character && !matchIsCharIsValid(character, currentInputIndex)) {
            character = ''
        }

        const newValue = replaceCharOfValue(currentInputIndex, character)

        onChange?.(newValue)

        const {isCompleted, finalValue} = matchIsCompletedEvent(newValue)

        if (isCompleted) {
            onComplete?.(finalValue)
        }

        // Char is valid so go to next input
        if (character !== '') {
            // handle when the filled input is before the input selected
            if (newValue.length - 1 < currentInputIndex) {
                selectInputByIndex(newValue.length)
            } else {
                manageCaretForNextInput(currentInputIndex)
            }

            // Only for backspace so don't go to previous input if the char is invalid
        } else if (initialChar === '') {
            if (newValue.length <= currentInputIndex) {
                selectInputByIndex(currentInputIndex - 1)
            }
        }
    }


    const handleOneInputKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const inputElement = event.target as HTMLInputElement
        const startPos = inputElement.selectionStart
        const endPos = inputElement.selectionEnd
        const currentInputIndex = getIndexByInputElement(inputElement)
        const isCaretBeforeChar = startPos === 0 && endPos === 0

        if (inputElement.value === event.key) {
            event.preventDefault()
            manageCaretForNextInput(currentInputIndex)
        } else if (KEYBOARD_KEY.backspace === event.key) {
            if (!inputElement.value) {
                event.preventDefault()

                selectInputByIndex(currentInputIndex - 1)
                // Caret is before the character and there is a character, so remove it
            } else if (isCaretBeforeChar) {
                event.preventDefault()
                const newValue = replaceCharOfValue(currentInputIndex, '')
                onChange?.(newValue)
                if (newValue.length <= currentInputIndex) {
                    selectInputByIndex(currentInputIndex - 1)
                }
            }
        } else if (KEYBOARD_KEY.left === event.key) {
            event.preventDefault()
            selectInputByIndex(currentInputIndex - 1)
        } else if (KEYBOARD_KEY.right === event.key) {
            event.preventDefault()
            selectInputByIndex(currentInputIndex + 1)
        } else if (KEYBOARD_KEY.home === event.key) {
            event.preventDefault()
            selectInputByIndex(0)
        } else if (KEYBOARD_KEY.end === event.key) {
            event.preventDefault()
            selectInputByIndex(valueSplit.length - 1)
        }
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const anInputIsFocused = valueSplit.some(({inputRef}) => {
            return inputRef.current === event.relatedTarget
        })

        if (!anInputIsFocused) {
            const {isCompleted, finalValue} = matchIsCompletedEvent(value)
            onBlur?.(finalValue, isCompleted)
        }
    }

    useEffect(() => {
        const {isCompleted, finalValue} = matchIsCompletedEvent(
            initialValue.current
        )

        if (isCompleted) {
            onCallbackEvent(finalValue)
        }
    }, [length, onCallbackEvent, matchIsCompletedEvent])

    return (
        <>
            <Box
                display={"flex"}
                gap="20px"
                alignItems="center"
                ref={ref}
                className={`MuiOtpInput-Box ${className || ''}`}
                {...restBoxProps}
            >
                {valueSplit.map(({character, inputRef}, index) => {
                    const {
                        onPaste,
                        onFocus,
                        onKeyDown,
                        className: TextFieldClassName,
                        onBlur: TextFieldOnBlur,
                        ...restTextFieldsProps
                    } = typeof TextFieldsProps === 'function'
                        ? TextFieldsProps(index) || {}
                        : TextFieldsProps || {}
                    return (
                        <TextFieldBox
                            autoFocus={autoFocus ? index === 0 : false}
                            autoComplete="one-time-code"
                            value={character}
                            inputRef={inputRef}
                            key={index}
                            className={`MuiOtpInput-TextField MuiOtpInput-TextField-${
                                index + 1
                            } ${TextFieldClassName || ''}`}
                            onPaste={(event) => {
                                event.preventDefault()
                                handleOneInputPaste(event)
                                onPaste?.(event)
                            }}
                            onFocus={(event) => {
                                event.preventDefault()
                                event.target.select()
                                onFocus?.(event)
                            }}
                            onChange={handleOneInputChange}
                            onKeyDown={(event) => {
                                handleOneInputKeyDown(event)
                                onKeyDown?.(event)
                            }}
                            onBlur={(event) => {
                                TextFieldOnBlur?.(event)
                                handleBlur(event)
                            }}
                            {...restTextFieldsProps}
                        />
                    )
                })}
            </Box>
        </>
    )
})

MuiOptInput.displayName = "MuiOptInput"

export default MuiOptInput;