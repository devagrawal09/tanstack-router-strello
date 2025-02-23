import { createFileRoute } from '@tanstack/solid-router'

import { createForm } from '@tanstack/solid-form'
import type { AnyFieldApi } from '@tanstack/solid-form'

interface FieldInfoProps {
  field: AnyFieldApi
}

export const Route = createFileRoute('/demo/form')({
  component: FormExample,
})

function FieldInfo(props: FieldInfoProps) {
  return (
    <>
      {props.field.state.meta.isTouched &&
      props.field.state.meta.errors.length ? (
        <em>{props.field.state.meta.errors.join(',')}</em>
      ) : null}
      {props.field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

function FormExample() {
  const form = createForm(() => ({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value)
    },
  }))

  return (
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-8 text-gray-800 leading-tight">
        Simple Form Example
      </h1>
      <form
        class="space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div class="space-y-1">
          <form.Field
            name="firstName"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'A first name is required'
                  : value.length < 3
                    ? 'First name must be at least 3 characters'
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                return (
                  value.includes('error') && 'No "error" allowed in first name'
                )
              },
            }}
            children={(field) => {
              return (
                <>
                  <label
                    for={field().name}
                    class="block text-sm font-medium text-gray-700 mb-1 leading-tight"
                  >
                    First Name:
                  </label>
                  <input
                    id={field().name}
                    name={field().name}
                    value={field().state.value}
                    onBlur={field().handleBlur}
                    onInput={(e) => field().handleChange(e.target.value)}
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm leading-relaxed p-2"
                  />
                  <FieldInfo field={field()} />
                </>
              )
            }}
          />
        </div>
        <div class="space-y-1">
          <form.Field
            name="lastName"
            children={(field) => (
              <>
                <label
                  for={field().name}
                  class="block text-sm font-medium text-gray-700 mb-1 leading-tight"
                >
                  Last Name:
                </label>
                <input
                  id={field().name}
                  name={field().name}
                  value={field().state.value}
                  onBlur={field().handleBlur}
                  onInput={(e) => field().handleChange(e.target.value)}
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm leading-relaxed p-2"
                />
                <FieldInfo field={field()} />
              </>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
          })}
          children={(state) => {
            return (
              <button
                type="submit"
                disabled={!state().canSubmit}
                class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed leading-tight"
              >
                {state().isSubmitting ? '...' : 'Submit'}
              </button>
            )
          }}
        />
      </form>
    </div>
  )
}
