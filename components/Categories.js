import { ScrollView } from 'react-native';
import React, { useState } from 'react';
import CategoryCard from './CategoryCard';

const Categories = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { img: '🍔', title: 'Burger' },
    { img: '🍕', title: 'Pizza' },
    { img: '🍿', title: 'Movies' },
    { img: '🧇', title: 'Waffles' },
    { img: '🌭', title: 'American' },
    { img: '🍔', title: 'All' },
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 15,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category.title}
          img={category.img}
          title={category.title}
          selected={selectedCategory === category.title}
          onPress={() => handleCategorySelect(category.title)}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
