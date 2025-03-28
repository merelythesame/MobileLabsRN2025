import { View, Image, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

export function GalleryScreen() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=30a26100e1284809abb9807ab43ca479')
            .then((response) => response.json())
            .then((data) =>
                setNews(
                    data.articles.map((item) => ({
                        image: item.urlToImage,
                    }))
                )
            )
            .catch((error) => console.error('Error fetching news:', error));
    }, []);

    const row = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    return (
        <View style={styles.container}>
            {row(news, 2).map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((item, index) => (
                        <Image key={index} source={{ uri: item.image }} style={styles.image} />
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    image: {
        width: '48%',
        height: 150
    },
});
