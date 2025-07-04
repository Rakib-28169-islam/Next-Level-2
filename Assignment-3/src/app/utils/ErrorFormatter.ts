import { ZodError, ZodIssue } from "zod";

export function formatZodError(err: ZodError) {
  const formattedErrors: Record<string, any> = {};

  for (const issue of err.issues) {//for more than one error
    const path = issue.path.join(".");

    const properties: Record<string, any> = {
      message: issue.message,
      type: issue.code,
    };

    
    if (issue.code === "too_small" && "minimum" in issue) {
      properties["min"] = (issue as any).minimum;
    }
    if (issue.code === "too_big" && "maximum" in issue) {
      properties["max"] = (issue as any).maximum;
    }

    formattedErrors[path] = {
      message: issue.message,
      name: "ValidatorError",
      properties,
      kind: issue.code,
      path,
      value:issue?.input
    };
  }

  return {
    message: "Validation failed",
    success: false,
    error: {
      name: "ValidationError",
      errors: formattedErrors,
    },
  };
}
