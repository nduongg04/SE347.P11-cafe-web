import Badge from "@/components/admin/Badge";
import Profile from "@/components/admin/Profile";
import SearchBar from "@/components/admin/SearchBar";

const Dashboard = () => {
  return (
	<div className="flex flex-col gap-10 flex-1 p-5">
		<div className="flex justify-between gap-10  font-barlow h-10">
			<SearchBar />
			<div className="h-full w-px bg-bright-gray" />
			<Profile />
		</div>
		<div className="flex justify-between">
			<Badge  />
		</div>
	</div>
  )
};
export default Dashboard;
