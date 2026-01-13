import { Link } from "react-router";
import {
  UserButton,
  SignInButton,
  SignUpButton,
  useAuth,
} from "@clerk/clerk-react";
import { ShoppingBagIcon, PlusIcon, UserIcon } from "lucide-react";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="navbar bg-base-300">
      <div className="max-w-5xl mx-auto w-full px-4 flex justify-between items-center">
        <div className="flex-1 items-start">
          <Link
            to="/"
            className="btn btn-ghost gap-2"
          >
            <ShoppingBagIcon />
            <span className="text-lg font-bold uppercase tracking-wider">
              ShopList
            </span>
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          {isSignedIn ? (
            <>
              <Link to="/create" className="btn btn-primary gap-2">
                <PlusIcon size={16} />
                <span className="hidden sm:inline">New Product</span>
              </Link>
              <Link to="/profile" className="btn btn-outline btn-primary">
                <UserIcon size={16} />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="btn btn-ghost btn-sm">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn btn-primary btn-sm">Sign Up</button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
