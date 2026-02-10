import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

interface SheetTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

interface SheetDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

interface SheetCloseProps extends React.HTMLAttributes<HTMLButtonElement> {}

const Sheet = ({
  open,
  onOpenChange,
  children,
}: SheetProps) => {
  const [isOpen, setIsOpen] = React.useState(open ?? false)

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <SheetContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </SheetContext.Provider>
  )
}

const SheetContext = React.createContext<{
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}>({
  isOpen: false,
  onOpenChange: () => {},
})

const useSheetContext = () => {
  const context = React.useContext(SheetContext)
  if (!context) {
    throw new Error("useSheetContext must be used within a Sheet")
  }
  return context
}

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { onOpenChange } = useSheetContext()

  return (
    <button
      ref={ref}
      className={cn(className)}
      onClick={() => onOpenChange(true)}
      {...props}
    />
  )
})
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = React.forwardRef<
  HTMLDivElement,
  SheetContentProps
>(({ className, children, ...props }, ref) => {
  const { isOpen, onOpenChange } = useSheetContext()

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div
        ref={ref}
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-full max-w-2xl overflow-y-auto border-l border-stone-200 bg-white shadow-lg animate-in slide-in-from-right",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  )
})
SheetContent.displayName = "SheetContent"

const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-start justify-between border-b border-stone-100 px-6 py-4", className)}
      {...props}
    />
  )
)
SheetHeader.displayName = "SheetHeader"

const SheetTitle = React.forwardRef<HTMLHeadingElement, SheetTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-xl font-semibold text-stone-900", className)}
      {...props}
    />
  )
)
SheetTitle.displayName = "SheetTitle"

const SheetDescription = React.forwardRef<HTMLParagraphElement, SheetDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-stone-500", className)}
      {...props}
    />
  )
)
SheetDescription.displayName = "SheetDescription"

const SheetClose = React.forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ className, ...props }, ref) => {
    const { onOpenChange } = useSheetContext()

    return (
      <button
        ref={ref}
        onClick={() => onOpenChange(false)}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-md p-1 transition-colors hover:bg-stone-100",
          className
        )}
        {...props}
      >
        <X className="size-5 text-stone-500" />
      </button>
    )
  }
)
SheetClose.displayName = "SheetClose"

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
}
