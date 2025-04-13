import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import CategoryTab from './CategoryTab';
import SearchIcon from "../assets/icons/searchIcon.svg";

export default function CategoryRow({ categories, selected, onSelect, hasSearch = true }) {
    const extendedCategories = hasSearch ? ['__search__', ...categories] : categories;

    return (
        <FlatList
            data={extendedCategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => {
                if (item === '__search__') {
                    return (
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#303649',
                                borderRadius: 8,
                                height: 38,
                                width: 38,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10,
                            }}
                            onPress={() => {
                                console.log('Search icon pressed');
                            }}
                        >
                            <SearchIcon width={14} height={14} />
                        </TouchableOpacity>
                    );
                }

                return (
                    <CategoryTab
                        label={item}
                        active={selected === item}
                        onPress={() => onSelect(item)}
                    />
                );
            }}
        />
    );
}
