import { useState, useCallback } from "react";
import { z } from "zod";

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

interface UseFormValidationProps<T> {
  schema: z.ZodSchema<T>;
  initialValues: T;
}

interface UseFormValidationReturn<T> {
  values: T;
  errors: Record<string, string>;
  isValid: boolean;
  isSubmitting: boolean;
  handleChange: (name: keyof T, value: string) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void>) => Promise<void>;
  validateField: (name: keyof T) => void;
  validateForm: () => ValidationResult;
  setIsSubmitting: (isSubmitting: boolean) => void;
  reset: () => void;
}

export function useFormValidation<T extends Record<string, string>>({
  schema,
  initialValues,
}: UseFormValidationProps<T>): UseFormValidationReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback(
    (name: keyof T) => {
      try {
        // Validar todo el formulario pero solo mostrar errores del campo específico
        schema.parse(values);

        // Si la validación pasa, limpiar el error
        setErrors((prev) => ({
          ...prev,
          [name as string]: "",
        }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.errors.find((err) =>
            err.path.includes(name as string)
          );
          if (fieldError) {
            setErrors((prev) => ({
              ...prev,
              [name as string]: fieldError.message,
            }));
          }
        }
      }
    },
    [schema, values]
  );

  const validateForm = useCallback((): ValidationResult => {
    try {
      schema.parse(values);
      setErrors({});
      return { isValid: true, errors: {} };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path.join(".");
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
        return { isValid: false, errors: newErrors };
      }
      return { isValid: false, errors: { general: "Error de validación" } };
    }
  }, [schema, values]);

  const handleChange = useCallback(
    (name: keyof T, value: string) => {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Limpiar error del campo cuando el usuario empieza a escribir
      if (errors[name as string]) {
        setErrors((prev) => ({
          ...prev,
          [name as string]: "",
        }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (onSubmit: (values: T) => Promise<void>) => {
      const validation = validateForm();

      if (!validation.isValid) {
        return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error("Error en submit:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validateForm]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  const isValid =
    Object.keys(errors).length === 0 &&
    Object.values(errors).every((error) => error === "");

  return {
    values,
    errors,
    isValid,
    isSubmitting,
    handleChange,
    handleSubmit,
    validateField,
    validateForm,
    setIsSubmitting,
    reset,
  };
}
