import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	ScrollView,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import feed from './data';

let tempComments = [];
let tempPosts = {};

function HomeScreen(props) {
	const [feeds, setFeeds] = useState(feed);

	return (
		<View style={{ flex: 1, backgroundColor: '#FFD600' }}>
			<ScrollView>
				<FlatList
					data={feeds}
					renderItem={({ item, index }) => (
						<View style={styles.feedsLayout}>
							<View style={styles.profileLayout}>
								<Image
									source={{
										uri: `${item.profile_pic}`,
									}}
									style={styles.profileImage}></Image>
								<View style={{ marginLeft: 10 }}>
									<Text style={{ fontSize: 20, color: 'white' }}>
										{item.name}
									</Text>
									<Text style={{ fontSize: 12, color: 'white' }}>
										{new Date().toString().substring(0, 16)}
									</Text>
								</View>
							</View>
							<Image
								style={styles.postImage}
								source={{ uri: `${item.post_image}` }}></Image>
							<View
								style={{
									height: 1,
									width: '100%',
									backgroundColor: '#FFD600',
								}}></View>
							<TouchableOpacity
								onPress={() => {
									props.navigation.navigate('COMMENTS PAGE');
									tempComments = item.comments;
									tempPosts = item;
								}}>
								<Text style={styles.postComment}>Comment</Text>
							</TouchableOpacity>
						</View>
					)}
					keyExtractor={({ item, index }) => index}></FlatList>
			</ScrollView>
		</View>
	);
}

function CommentsPage() {
	return (
		<View style={{ flex: 1, backgroundColor: '#FFD600' }}>
			<Input
				placeholder='Write a Comment'
				leftIcon={<Icon name='comment' size={24} color='black' />}
				rightIcon={
					<TouchableOpacity>
						<Icon name='plus' size={24} color='black' />
					</TouchableOpacity>
				}
			/>

			<ScrollView>
				<View style={styles.feedsLayout}>
					<View style={styles.profileLayout}>
						<Image
							source={{
								uri: `${tempPosts.profile_pic}`,
							}}
							style={styles.profileImage}></Image>
						<View style={{ marginLeft: 10 }}>
							<Text style={{ fontSize: 20, color: 'white' }}>
								{tempPosts.name}
							</Text>
							<Text style={{ fontSize: 12, color: 'white' }}>
								{new Date().toString().substring(0, 16)}
							</Text>
						</View>
					</View>
					<Image
						style={styles.postImage}
						source={{ uri: `${tempPosts.post_image}` }}></Image>
				</View>
				<FlatList
					data={tempComments}
					renderItem={({ item }) => (
						<View style={styles.feedsLayout}>
							<View style={styles.profileLayout}>
								<Image
									source={{
										uri: `${item.profile_pic}`,
									}}
									style={styles.profileImage}></Image>
								<View style={{ marginLeft: 10 }}>
									<Text style={{ fontSize: 20, color: 'white' }}>
										{item.name}
									</Text>
									<Text style={{ fontSize: 12, color: 'white' }}>
										{new Date().toString().substring(0, 16)}
									</Text>
								</View>
							</View>
							<Text style={styles.commentLayout}>{item.comment}</Text>
						</View>
					)}
					keyExtractor={({ item, index }) => index}></FlatList>
			</ScrollView>
		</View>
	);
}

const Stack = createStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='FEEDS PAGE' component={HomeScreen} />
				<Stack.Screen name='COMMENTS PAGE' component={CommentsPage} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;

const styles = StyleSheet.create({
	profileImage: {
		height: 50,
		width: 50,
		borderRadius: 50,
		borderColor: '#FFD600',
		borderWidth: 1,
	},
	feedsLayout: {
		borderRadius: 10,
		margin: 10,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 1,
		shadowRadius: 3,
		elevation: 10,
		backgroundColor: 'black',
	},
	profileLayout: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
	},
	postImage: {
		height: 200,
		marginTop: 20,
		borderWidth: 3,
	},
	postComment: {
		fontSize: 20,
		textAlign: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: 'black',
		fontWeight: 'bold',
		color: 'white',
	},
	commentLayout: {
		padding: 10,
		fontSize: 20,
		color: 'white',
	},
});
