import React from 'react';

const TableHeader = ({ sortMethod, columns, handleChangeSortMethod }) => {

	return (
		<thead className='TableHeader'>
			<tr className='TableRow'>
				{ columns.map(column => {
					return (
						<th key={column.key}>
							<div className="TableHeaderItem">
								{column.name}
								<div className='SortArrows'>
									<div 
										className='UpArrow' 
										onClick={() => handleChangeSortMethod(column.key, 'asc')}/>
									<div 
										className='DownArrow' 
										onClick={() => handleChangeSortMethod(column.key, 'desc')}/>
								</div>
							</div>
						</th>
					)
				}) }
			</tr>
		</thead>
	)
}

export default TableHeader;