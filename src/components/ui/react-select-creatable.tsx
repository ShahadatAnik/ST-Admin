import { ChevronDown, X } from 'lucide-react';
import { components } from 'react-select';
import Creatable, { CreatableProps } from 'react-select/creatable';

import { cn } from '@/lib/utils';

function ReactSelectCreatable<T, IsMulti extends boolean, Group extends unknown>({
	...props
}: CreatableProps<T, IsMulti, any>) {
	return (
		<Creatable
			classNames={{
				control: ({ isFocused, isDisabled }) =>
					cn(
						'!bg-gradient !min-h-10 !rounded-md border !border-input !text-sm !text-foreground',
						isFocused && '!outline !outline-2 !outline-offset-2 !outline-secondary',
						isDisabled &&
							'cursor-not-allowed border-destructive/50 !from-destructive/5 !to-destructive/5 text-destructive'
					),

				placeholder: () => 'text-muted-foreground text-sm',
				input: () => 'grow',
				singleValue: () => 'grow',
				menu: () => '!bg-base !overflow-hidden  !rounded !shadow-2xl !text-sm border !border-input !p-1',
				option: ({ isFocused, isSelected }) =>
					cn(
						'rounded !px-3 !py-1.5 text-sm text-foreground',
						isFocused && '!bg-base-200',
						isSelected && '!bg-transparent !text-foreground before:mr-1 before:content-["✔"]'
					),
				noOptionsMessage: () =>
					'text-destructive text-sm p-2 bg-destructive/5 border border-destructive/20 rounded',
				indicatorSeparator: () => 'hidden',
			}}
			components={{
				ClearIndicator: (props) => (
					<components.ClearIndicator className='mr-1 border-r border-r-input pr-1' {...props}>
						<X className='size-5 font-medium text-destructive' />
					</components.ClearIndicator>
				),

				MultiValueRemove: (props) => (
					<components.MultiValueRemove {...props}>
						<X className='ml-1 size-4 font-medium text-destructive' />
					</components.MultiValueRemove>
				),

				DropdownIndicator: (props) => (
					<components.DropdownIndicator {...props}>
						<ChevronDown
							className={cn(
								'size-5 transform text-secondary/50 transition-transform duration-300',
								props.selectProps.menuIsOpen && 'rotate-90'
							)}
						/>
					</components.DropdownIndicator>
				),
			}}
			{...props}
		/>
	);
}

export default ReactSelectCreatable;
