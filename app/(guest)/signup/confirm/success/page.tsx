import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Success() {
    return (
        <div className="min-h-screen flex items-center justify-center flex-col gap-4">
            <h1 className="text-4xl">Congratulations!</h1>
            <p>
                Your account has been successfully verified
            </p>
            <Button asChild>
                <Link href={"/"}>
                    Continue to login
                </Link>
            </Button>
        </div>
    );
}