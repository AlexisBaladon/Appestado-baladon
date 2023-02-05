import React, { useContext, useEffect } from 'react';
import { Items, Buttons, Search, Navbar } from '../../components';
import { View, Alert, Pressable } from 'react-native';
import { styles } from './favourites.styles';
import { TEXT } from '../../constants';
import { FavouritesContextComponents } from '../../context';
import { DtItem } from '../../interfaces';
import StoreItem from '../../components/items/storeItem/storeItem';
import { NavbarParamList, RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';

const {
	NO_ITEMS_MESSAGE,
	DELETE_ALL_ITEMS_TITLE,
	DELETE_ALL_ITEMS_DESCRIPTION,
	CANCEL_TITLE,
	SEARCH_PLACEHOLDER,
} = TEXT;

type FavouritesScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Favourites'>;

const FavouritesScreen: React.FC<FavouritesScreenNavigationProp> = ({ route, navigation }) => {
	const { FavouriteItemsContext } = FavouritesContextComponents;
	const { shownItems, deleteAllItems, filterByText } = useContext(FavouriteItemsContext);

	useEffect(() => {
		return () => {
			filterByText('');
		};
	}, []);

	const onHandleDeleteAllItems = () => {
		Alert.alert(DELETE_ALL_ITEMS_TITLE, DELETE_ALL_ITEMS_DESCRIPTION, [
			{ text: CANCEL_TITLE, style: 'cancel' },
			{ text: DELETE_ALL_ITEMS_TITLE, onPress: deleteAllItems },
		]);
	};

	type TButton = { title: string; onPress(): void; pressed: boolean };
	const buttons: Array<TButton> = [
		{ title: DELETE_ALL_ITEMS_TITLE, onPress: onHandleDeleteAllItems, pressed: false },
	];

	const handlePress = (item: DtItem) => {
		navigation.navigate('Detail', {
			name: item.title,
			item,
		});
	};

	const RenderItem: React.FC<{ item: DtItem }> = ({ item }) => {
		return (
			<Pressable style={styles.item} onPress={() => handlePress(item)}>
				<StoreItem item={item} selling={false} />
			</Pressable>
		);
	};

	return (
		<>
			<View style={styles.search}>
				<Search onChangeText={filterByText} placeHolder={SEARCH_PLACEHOLDER} />
			</View>
			<Buttons buttons={buttons} />
			<Items
				shownItems={shownItems}
				noItemsMessage={NO_ITEMS_MESSAGE}
				RenderItem={RenderItem}
				numColumns={2}
			/>
			<Navbar
				chosenIcon={2}
				setChosenIcon={(index: number) => {
					const pages: (keyof NavbarParamList)[] = ['Store', 'Cart', 'Favourites'];
					const names = ['Tienda', 'Carrito', 'Favoritos'];
					return navigation.navigate(pages[index], {
						name: names[index],
					});
				}}
			/>
		</>
	);
};

export default FavouritesScreen;
