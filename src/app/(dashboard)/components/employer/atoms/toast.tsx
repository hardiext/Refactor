import { toast } from "sonner"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export function showSuccess(message: string, description?: string) {
  toast.custom(() => (
    <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900 border-l-4 border-green-500 p-4 rounded-xl shadow-lg">
      <CheckCircle className="text-green-500 mt-1" />
      <div>
        <p className="text-green-800 dark:text-green-100 font-semibold">{message}</p>
        {description && <p className="text-green-600 dark:text-green-300 text-sm">{description}</p>}
      </div>
    </div>
  ), { duration: 3000 })
}

export function showError(message: string, description?: string) {
  toast.custom(() => (
    <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4 rounded-xl shadow-lg">
      <XCircle className="text-red-500 mt-1" />
      <div>
        <p className="text-red-800 dark:text-red-100 font-semibold">{message}</p>
        {description && <p className="text-red-600 dark:text-red-300 text-sm">{description}</p>}
      </div>
    </div>
  ), { duration: 4000 })
}

export function showWarning(message: string, description?: string) {
  toast.custom(() => (
    <div className="flex items-start gap-3 bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 rounded-xl shadow-lg">
      <AlertTriangle className="text-yellow-500 mt-1" />
      <div>
        <p className="text-yellow-800 dark:text-yellow-100 font-semibold">{message}</p>
        {description && <p className="text-yellow-600 dark:text-yellow-300 text-sm">{description}</p>}
      </div>
    </div>
  ), { duration: 3500 })
}
