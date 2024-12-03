import { Control, Controller } from 'react-hook-form'

interface PickerButtonsProps {
  control: Control<any>
  name: string
  options: { label: string; value: any }[]
  required?: boolean
  disabled?: boolean
  errorMessage?: string
}

// TODO: a11y

const PickerButtons = ({ control, name, options, required, errorMessage }: PickerButtonsProps) => {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        rules={{ required: required ? 'Required' : false }}
        render={({ field: { onChange, value } }) => (
          <div role="radiogroup">
            {options.map((opt) => {
              const bgActive = value === opt.value ? 'bg-primary text-white' : 'border-black'
              return (
                <button
                  type="button"
                  key={opt.label}
                  className={`p-2 border rounded-md mr-1 ${bgActive}`}
                  onClick={() => onChange(opt.value)}
                  role="radio"
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        )}
      />
      {errorMessage ? <div className="text-error text-sm">{errorMessage}</div> : null}
    </div>
  )
}

export default PickerButtons
