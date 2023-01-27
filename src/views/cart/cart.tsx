import React from 'react';
import Items from '../../components/items/items/items';
import Search from '../../components/global/search/search';
import { View, Text } from 'react-native';
import OptionsContainer from '../../components/options/options/optionsContainer';
import { styles, itemHeight } from './cart.styles';
import { TEXT } from '../../constants';
import CustomText from '../../components/global/customText/customText';

const CartScreen = () => {
	const {
		HEADER_TITLE,
		SEARCH_PLACEHOLDER,
		ADD_BUTTON_MESSAGE,
		CURRENCY_SYMBOL,
		DELETE_ALL_ITEMS_TITLE,
		DELETE_ALL_ITEMS_DESCRIPTION,
		CANCEL_TITLE,
		NO_ITEMS_MESSAGE,
		DELETE_ITEM_TITLE,
		DELETE_ITEM_DESCRIPTION,
		CONFIRM_DELETE_ITEM_TITLE
	} = TEXT;

	return (
		<View style={styles.app}>
			<View style={styles.items}>
				<Items
					itemHeight={itemHeight}
					noItemsMessage={NO_ITEMS_MESSAGE}
					currencySymbol={CURRENCY_SYMBOL}
					deleteItemTitle={DELETE_ITEM_TITLE}
					deleteItemDescription={DELETE_ITEM_DESCRIPTION}
					cancelTitle={CANCEL_TITLE}
					confirmDeleteTitle={CONFIRM_DELETE_ITEM_TITLE}
				/>
			</View>
		</View>
	);
};

export default CartScreen;