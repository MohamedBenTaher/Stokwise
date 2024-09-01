import React from 'react';
import dayjs from 'dayjs';
import { Search } from 'lucide-react';
import { Input } from './input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import GlobalStateContext from '@/context/globalStateContext';

dayjs.extend(advancedFormat);
function HeaderSection() {
	const date = dayjs().format('dddd, MMMM DD');
	const { user } = React.useContext(GlobalStateContext);

	return (
		<div className="flex flex-col w-full px-4 py-12 md:flex-row">
			<div className="flex flex-col items-start justify-start gap-y-4">
				<h3 className="text-2xl font-bold text-pretty">
					Greetings, {user?.firstName + ' ' + user?.lastName}
				</h3>
				<h4 className="text-lg font-semibold">{date}</h4>
				<div className="flex flex-row items-center"></div>
			</div>
			<div className="flex items-start gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<form className="ml-auto flex-1 sm:flex-initial">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search ..."
							className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
						/>
					</div>
				</form>
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</div>
		</div>
	);
}

export default HeaderSection;
