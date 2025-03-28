import React, { useState, useEffect } from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';

export function News() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=30a26100e1284809abb9807ab43ca479')
            .then((response) => response.json())
            .then((data) =>
                setNews(
                    data.articles.map((item) => ({
                        title: item.title,
                        description: item.description,
                        image: item.urlToImage,
                        date: new Date(item.publishedAt).toLocaleDateString(),
                    }))
                )
            )
            .catch((error) => console.error("Error fetching news:", error));
    }, []);

    return (
        <ScrollView style={{ width: '100%' }}>
            {news.map((item, index) => (
                <View key={index} style={styles.newBlock}>
                    <Image source={{ uri: item.image }} style={styles.img} />
                    <View>
                        <Text style={styles.newsTitle}>{item.title}</Text>
                        <Text style={styles.newsDate}>{item.date}</Text>
                        <Text style={styles.newsDescription}>{item.description}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20,
    },
    img: {
        width: 50,
        height: 50,
        marginRight: 20,
    },
    newBlock: {
        flexDirection: 'row',
        marginLeft: 40,
        marginBottom: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '70%'
    },
    textBlock: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    newsTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    newsDate: {
        fontSize: 12,
        color: 'gray',
    },
    newsDescription: {
        fontSize: 14,
    },
});
