import { Staff } from "./columns";
import { toast } from "sonner";
import { url, token } from '@/constants';
export async function getData(): Promise<Staff[]> {
    const response = await fetch(`${url}/staff/getall`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        toast('Failed to fetch data');
        return [];
    }
    const data = await response.json();
    const fetchedStaff: Staff[] = data.map((item: any) => ({
        staffId: item.staffId,
        staffName: item.staffName,
        username: item.username,
        isAdmin: item.isAdmin
    }));
    return fetchedStaff;
}
