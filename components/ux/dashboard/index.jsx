import {getServerSession} from "next-auth";
import {authOptions} from "@/app/lib/auth";
import {redirect} from "next/navigation";
import AuthButton from "../button";

const Dashboard = async () => {
  // Get the session server-side
  const session = await getServerSession(authOptions);

  console.log(session);

  if (!session) {
    redirect("/login");
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
