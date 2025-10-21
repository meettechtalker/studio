import { searchUsers } from "@/lib/data";
import { UserCard } from "@/components/profile/user-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default async function DiscoverPage({ searchParams }: { searchParams?: { query?: string } }) {
    const query = searchParams?.query || '';
    const users = await searchUsers(query);
    
    return (
        <div className="max-w-4xl mx-auto w-full space-y-6">
            <h1 className="text-3xl font-headline font-bold">Discover</h1>
            <p className="text-muted-foreground">Find and connect with other users.</p>
            <form>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="search"
                        name="query"
                        placeholder="Search for users..."
                        className="pl-10"
                        defaultValue={query}
                    />
                </div>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {users.map(user => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>

             {users.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg col-span-full">
                    <p className="text-muted-foreground">No users found.</p>
                    <p className="text-sm text-muted-foreground">Try a different search term.</p>
                </div>
            )}
        </div>
    );
}
