import { Controller, Control, Validate } from 'react-hook-form'
import Select from 'react-select'

interface ControlledSelectProps {
  control: Control<any>
  name: string
  options: { label: string; value: any }[]
  required?: boolean
  disabled?: boolean
  errorMessage?: string
  validate?: Validate<any, any>
}

const ControlledSelect = ({
  control,
  name,
  options,
  required,
  disabled,
  errorMessage,
  validate,
}: ControlledSelectProps) => {
  return (
    <>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        rules={{ required: required ? 'Required' : false, validate }}
        render={({ field: { onChange, value } }) => (
          <Select
            name={name}
            options={options}
            isDisabled={disabled}
            value={options.find((o) => o.value === value)}
            onChange={(v) => onChange(v.value)}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: errorMessage ? 'red' : null,
              }),
            }}
          />
        )}
      />
      {errorMessage ? <div className="text-red-700 text-sm">{errorMessage}</div> : null}
    </>
  )
}

export default ControlledSelect
