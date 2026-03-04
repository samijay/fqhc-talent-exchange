"use client";

import { Suspense, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, Mail, Eye, EyeOff } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { createAuthClient } from "@/lib/supabase";
import { toast } from "sonner";

/* ------------------------------------------------------------------ */
/*  Bilingual helper                                                    */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Login Form (inner component — uses useSearchParams)                */
/* ------------------------------------------------------------------ */

function LoginForm() {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  // Sanitize redirect path — prevent open redirect attacks
  const rawNext = searchParams.get("next");
  const next =
    rawNext && rawNext.startsWith("/") && !rawNext.startsWith("//")
      ? rawNext
      : "/dashboard";
  const authError = searchParams.get("error");

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const supabase = createAuthClient();

  // ── Email/Password Sign In ──
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(
        t(
          {
            en: "Invalid email or password. Please try again.",
            es: "Correo o contraseña inválidos. Intenta de nuevo.",
          },
          locale
        )
      );
      setLoading(false);
      return;
    }

    router.push(next);
  };

  // ── Email/Password Sign Up ──
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (password.length < 6) {
      toast.error(
        t(
          {
            en: "Password must be at least 6 characters.",
            es: "La contraseña debe tener al menos 6 caracteres.",
          },
          locale
        )
      );
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${next}`,
      },
    });

    if (error) {
      toast.error(
        error.message.includes("already registered")
          ? t(
              {
                en: "This email is already registered. Try signing in.",
                es: "Este correo ya está registrado. Intenta iniciar sesión.",
              },
              locale
            )
          : t(
              {
                en: "Something went wrong. Please try again.",
                es: "Algo salió mal. Intenta de nuevo.",
              },
              locale
            )
      );
      setLoading(false);
      return;
    }

    toast.success(
      t(
        {
          en: "Check your email for a confirmation link.",
          es: "Revisa tu correo para un enlace de confirmación.",
        },
        locale
      )
    );
    setLoading(false);
  };

  // ── Google OAuth ──
  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${next}`,
      },
    });
  };

  // ── Password Reset ──
  const handleResetPassword = async () => {
    if (!email) {
      toast.error(
        t(
          {
            en: "Enter your email address first.",
            es: "Ingresa tu correo electrónico primero.",
          },
          locale
        )
      );
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
    });

    if (!error) {
      setResetSent(true);
      toast.success(
        t(
          {
            en: "Password reset email sent. Check your inbox.",
            es: "Correo de restablecimiento enviado. Revisa tu bandeja.",
          },
          locale
        )
      );
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Logo + Header */}
      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <Heart className="size-8 fill-teal-700 text-teal-700" />
          <span className="text-2xl font-bold tracking-tight text-stone-900">
            FQHC <span className="text-teal-700">Talent</span>
          </span>
        </Link>
        <h1 className="mt-6 text-2xl font-bold text-stone-900">
          {mode === "signin"
            ? t({ en: "Welcome back", es: "Bienvenido de nuevo" }, locale)
            : t({ en: "Create your account", es: "Crea tu cuenta" }, locale)}
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          {t(
            {
              en: "Save your preferences, bookmark content, and customize your intelligence feed.",
              es: "Guarda tus preferencias, marca contenido favorito y personaliza tu feed de inteligencia.",
            },
            locale
          )}
        </p>
      </div>

      {/* Auth Error Banner */}
      {authError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {t(
            {
              en: "Authentication failed. Please try again.",
              es: "La autenticación falló. Intenta de nuevo.",
            },
            locale
          )}
        </div>
      )}

      {/* Google OAuth Button */}
      <button
        onClick={handleGoogleSignIn}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:bg-stone-50"
      >
        <svg className="size-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        {t(
          { en: "Continue with Google", es: "Continuar con Google" },
          locale
        )}
      </button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-stone-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-stone-400">
            {t({ en: "or", es: "o" }, locale)}
          </span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form
        onSubmit={mode === "signin" ? handleSignIn : handleSignUp}
        className="space-y-4"
      >
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-stone-700"
          >
            {t({ en: "Email", es: "Correo electrónico" }, locale)}
          </label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-stone-300 py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-stone-700"
          >
            {t({ en: "Password", es: "Contraseña" }, locale)}
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-stone-300 py-2.5 pl-4 pr-10 text-sm text-stone-900 placeholder:text-stone-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder={mode === "signup" ? t({ en: "At least 6 characters", es: "Al menos 6 caracteres" }, locale) : "••••••••"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {/* Forgot Password (sign in mode only) */}
        {mode === "signin" && (
          <div className="text-right">
            <button
              type="button"
              onClick={handleResetPassword}
              className="text-sm text-teal-600 hover:text-teal-700"
              disabled={resetSent}
            >
              {resetSent
                ? t({ en: "Reset email sent!", es: "¡Correo de restablecimiento enviado!" }, locale)
                : t({ en: "Forgot password?", es: "¿Olvidaste tu contraseña?" }, locale)}
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? t({ en: "Loading...", es: "Cargando..." }, locale)
            : mode === "signin"
              ? t({ en: "Sign In", es: "Iniciar Sesión" }, locale)
              : t({ en: "Create Account", es: "Crear Cuenta" }, locale)}
        </button>
      </form>

      {/* Toggle Mode */}
      <p className="text-center text-sm text-stone-500">
        {mode === "signin" ? (
          <>
            {t({ en: "Don't have an account?", es: "¿No tienes cuenta?" }, locale)}{" "}
            <button
              onClick={() => setMode("signup")}
              className="font-medium text-teal-600 hover:text-teal-700"
            >
              {t({ en: "Create one", es: "Crea una" }, locale)}
            </button>
          </>
        ) : (
          <>
            {t({ en: "Already have an account?", es: "¿Ya tienes cuenta?" }, locale)}{" "}
            <button
              onClick={() => setMode("signin")}
              className="font-medium text-teal-600 hover:text-teal-700"
            >
              {t({ en: "Sign in", es: "Inicia sesión" }, locale)}
            </button>
          </>
        )}
      </p>

      {/* Back to site */}
      <p className="text-center text-sm text-stone-400">
        <Link href="/" className="hover:text-teal-600">
          ← {t({ en: "Back to site", es: "Volver al sitio" }, locale)}
        </Link>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Login Page (wraps LoginForm in Suspense for useSearchParams)       */
/* ------------------------------------------------------------------ */

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <Suspense fallback={
        <div className="flex items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-stone-300 border-t-teal-700" />
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
