import { Controller, Control } from 'react-hook-form'
import Select from 'react-select'
import { Option } from '../types'

interface ControlledSelectProps {
  control: Control<any>
  name: string
  options: Option[]
  required?: boolean
  disabled?: boolean
  errorMessage?: string
}

const ControlledSelect = ({ control, name, options, required, disabled, errorMessage }: ControlledSelectProps) => {
  return (
    <>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        rules={{ required: required ? 'Required' : false }}
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
