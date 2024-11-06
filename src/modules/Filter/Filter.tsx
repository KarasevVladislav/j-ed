import React, { useEffect, useState } from 'react';

import styles from './Filter.module.css';

type FilterProps = {
  filters: string[];
  filterHandler: (filterBy: string, value: string) => void;
}

export function Filter({ filters, filterHandler }: FilterProps) {
	const [selectedFilter, setSelectedFilter] = useState('');
	const [filterValue, setFilterValue] = useState('');

	useEffect(() => {
		if (!filters.length) return;
		setSelectedFilter(filters[0]);
	}, [filters]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			filterHandler(selectedFilter, filterValue);
		}, 500);

		return () => clearTimeout(timeout);
	}, [filterHandler, filterValue, selectedFilter]);

	const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
		setSelectedFilter(e.target.value);
		setFilterValue('');
	};

	const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setFilterValue(e.target.value);
	};

	if (!filters.length) return null;

	return (
		<div className={styles.root}>
			<span>Filter by</span>
			<select
				name="filters"
				id="filters"
				onChange={handleSelectChange}
				value={selectedFilter}
			>
				{filters.map(filter => (
					<option key={filter} value={filter}>{filter}</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Search..."
				value={filterValue}
				onChange={handleInputChange}
			/>
		</div>
	);
}
