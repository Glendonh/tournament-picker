import { Controller, Control } from 'react-hook-form'
import Select from 'react-select'

interface ControlledSelectProps {
  control: Control<any>
  name: string
  options: { label: string; value: string }[]
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
        rules={{ required }}
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
