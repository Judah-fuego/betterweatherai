"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const phonenumber = formData.get("phonenumber")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    console.error("Email and password are required.");
    return encodedRedirect("error", "/sign-up", "Email and password are required");
  }

  // Attempt sign-up
  const { error: authError, data: signUpData } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  // Handle authentication errors
  if (authError) {
    console.error(`Supabase Auth Error: ${authError.code} - ${authError.message}`);
    console.error(authError);
    return encodedRedirect("error", "/sign-up", authError.message);
  }

  if (!signUpData.user) {
    console.error("User is not authenticated.");
    return encodedRedirect("error", "/sign-up", "Failed to authenticate user after sign-up.");
  }


  // Success message
  return encodedRedirect(
    "success",
    "/sign-in",
    "Thanks for signing up! Please check your email for a verification link."
  );
};



export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
    
  const { data: existingUser, error: fetchError } = await supabase
  .from('profiles')
  .select('email')
  .eq('email', email)
  .single();


if (fetchError) {
  const { data, error: profileError } = await supabase.from('profiles').insert({
    email: email,
  });
  if (profileError) {
    console.error(profileError.code + " " + profileError.message);
    return encodedRedirect("error", "/sign-up", profileError.message);
  }
}




  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};


