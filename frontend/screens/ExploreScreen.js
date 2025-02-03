import React from 'react';
import { ScrollView } from 'react-native';
import Card from './components/Card';

const ExploreScreen = () => {
    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Card title="New Art">Let's see what can I do for you?</Card>
        <Card title="Generate Platter">Explore new possibilities!</Card>
        <Card title="Exploring Market">Discover amazing artworks!</Card>
        </ScrollView>
    );
};

export default ExploreScreen;