import { useEffect, useRef } from 'react';
import Candy from './level-items/Candy';
import SuperCandy from './level-items/SuperCandy';
import LevelManager from './level-manager';

type LevelItemProps = {
	item: LevelItem;
	index: number;
	id: string;
};

const getItemComponent = (item: LevelItem, itemID: string): JSX.Element => {
	switch (item?.type) {
		case 'Candy':
			return <Candy color={item.color} id={itemID}></Candy>;

		case 'SuperCandy':
			return <SuperCandy color={item.color} id={itemID}></SuperCandy>;
		default:
			return <div></div>;
	}
};

const LevelItem = ({ id, item }: LevelItemProps) => {
	const elementRef = useRef<HTMLDivElement | null>(null);
	const rowIndexRef = useRef<number>(0);
	const columnIndexRef = useRef<number>(0);
	const positionXRef = useRef<number>(0);
	const positionYRef = useRef<number>(0);
	const itemActiveRef = useRef<boolean>(true);

	useEffect(() => {
		updatePosition();
		LevelManager.subscribeItemsChange(onLevelItemsChanged);

		return () => {
			LevelManager.unsubscribeItemsChange(onLevelItemsChanged);
		};
	}, []);

	const onLevelItemsChanged = (items: LevelItem[], matched: boolean): void => {
		const itemMatched = !items.some(x => x?.key === id);
		if (itemMatched && itemActiveRef.current) {
			itemActiveRef.current = false;
			updateOpacity('0');
			return;
		}
		updatePosition();
	};

	const updateGridPosition = (updateX: boolean = true, updateY: boolean = true): void => {
		const gridIndex = LevelManager.levelData.items.findIndex(x => x?.key === id);
		rowIndexRef.current = Math.ceil((gridIndex + 1) / 9);
		columnIndexRef.current = gridIndex + 1 - (rowIndexRef.current - 1) * 9;
		updateX && (positionXRef.current = 100 * (columnIndexRef.current - 1));
		updateY && (positionYRef.current = 100 * (rowIndexRef.current - 1));
	};

	const updatePosition = (): void => {
		updateGridPosition();
		if (elementRef.current) {
			elementRef.current.style.transform = `translate(${positionXRef.current}%, ${positionYRef.current}%)`;
		}
	};

	const updateOpacity = (value: string): void => {
		if (elementRef.current) elementRef.current.style.opacity = value;
	};

	updateGridPosition();

	return (
		<div
			className={`w-[calc(100%/9)] p-[1.7%] aspect-square block absolute duration-300`}
			style={{
				transform: `translate(${positionXRef.current}%, ${positionYRef.current}%)`,
			}}
			ref={elementRef}
		>
			{getItemComponent(item, id)}
		</div>
	);
};

export default LevelItem;
