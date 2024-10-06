import Badge from "@/components/admin/Badge";
import Profile from "@/components/admin/Profile";
import SearchBar from "@/components/admin/SearchBar";

const Dashboard = () => {
  return (
	<div className="flex flex-col gap-10 flex-1">
		<div className="flex justify-between flex-1">
			<SearchBar />
			<Profile />
		</div>
		<div className="flex justify-between">
			<Badge  />
		</div>
	</div>
  )
};
export default Dashboard;
