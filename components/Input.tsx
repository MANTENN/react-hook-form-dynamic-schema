import { forwardRef } from "react"

export const Input = forwardRef(function Input({ errors, ...props }: any, ref) {
  return (
    <div>
      <input {...props} ref={ref} />
      {errors && <div className="text-red-800">
        {errors[props.name] && errors[props.name].message}
      </div>}
    </div>
  )
})