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
          <div>
            {options.map((opt) => {
              const bgActive = value === opt.value ? 'bg-emerald-800 text-white' : 'border-black'
              return (
                <button
                  type="button"
                  key={opt.label}
                  className={`p-2 border rounded-md mr-1 ${bgActive}`}
                  onClick={() => onChange(opt.value)}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        )}
      />
      {errorMessage ? <div className="text-red-700 text-sm">{errorMessage}</div> : null}
    </div>
  )
}

export default PickerButtons
