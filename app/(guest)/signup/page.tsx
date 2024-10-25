"use client";

import { auth_signup } from "@/actions/auth";
import FormError from "@/components/auth/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [formErrors, setFormErrors] = useState<FormError[]>([]);

    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const { toast } = useToast()

    const clearForm = () => {
        setEmail("");
        setFirstname("");
        setLastname("");
        setPhone("");
        setPassword("");
        setPassword2("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setFormErrors([]);

        if (password != password2) {
            setFormErrors([{ field: "password2", message: "Passwords do not match" }]);
            return;
        }

        startTransition(async () => {
            const response = await auth_signup({
                email,
                firstname,
                lastname,
                phone,
                password,
            });

            if (response.success) {
                clearForm();

                toast({
                    description: "Your account has been created successfully. Please verify your email to login",
                });
                setTimeout(() => {
                    router.push("/");
                }, 3000);
            } else {
                if (response.errors) {
                    setFormErrors(response.errors);
                } else {
                    toast({
                        description: response.error || "An error occurred",
                        variant: "destructive",
                    });
                }
            }
        });
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center h-full py-12">
            <form className="mx-auto grid w-[350px] gap-6" onSubmit={handleSubmit}>
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your details below to create an account
                    </p>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="firstname">First Name</Label>
                        <Input
                            id="firstname"
                            type="text"
                            placeholder="John"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <FormError errors={formErrors} field="firstname" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastname">Last Name</Label>
                        <Input
                            id="lastname"
                            type="text"
                            placeholder="Doe"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                        <FormError errors={formErrors} field="lastname" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            type="text"
                            placeholder="880XXXXXXXXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <FormError errors={formErrors} field="phone" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormError errors={formErrors} field="email" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            placeholder="********"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormError errors={formErrors} field="password" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Confirm Password</Label>
                        <Input
                            id="password2"
                            type="password"
                            value={password2}
                            placeholder="********"
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                        <FormError errors={formErrors} field="password2" />
                    </div>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "Logging in..." : "Login"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
