import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import AuthButton from "../button";

const Dashboard = async () => {
  // Get the session server-side
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="p-6">
      <div>
        <h1 className="text-xl font-bold">
          Welcome to your Dashboard, {session.user.name}!
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
