import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Modal,
  TextInput
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from '@/components/ThemedText';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Sample group data
const sampleGroups = [
  {
    id: '1',
    name: 'Marvel Fans Club',
    description: 'For die-hard Marvel movie enthusiasts',
    members: 24,
    maxMembers: 30,
    image: 'https://via.placeholder.com/150?text=Marvel+Fans'
  },
  {
    id: '2',
    name: 'Sci-Fi Movie Lovers',
    description: 'Exploring the frontiers of science fiction cinema',
    members: 18,
    maxMembers: 25,
    image: 'https://via.placeholder.com/150?text=Sci-Fi+Lovers'
  },
  {
    id: '3',
    name: 'Indie Film Explorers',
    description: 'Discovering hidden gems in independent cinema',
    members: 12,
    maxMembers: 20,
    image: 'https://via.placeholder.com/150?text=Indie+Films'
  }
];

export default function WatchTogetherScreen() {
  const colorScheme = useColorScheme();
  const [isCreateGroupModalVisible, setIsCreateGroupModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');

  const renderGroupCard = (group) => (
    <TouchableOpacity 
      key={group.id} 
      style={[
        styles.groupCard, 
        { 
          backgroundColor: '#FFF', 
          borderColor: Colors[colorScheme ?? 'light'].primary 
        }
      ]}
    >
      <Image 
        source={{ uri: group.image }} 
        style={styles.groupImage} 
      />
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{group.name}</Text>
        <Text style={styles.groupDescription} numberOfLines={2}>
          {group.description}
        </Text>
        <View style={styles.groupMemberInfo}>
          <FontAwesome name="users" size={16} color={Colors[colorScheme ?? 'light'].primary} />
          <Text style={styles.memberText}>
            {` ${group.members}/${group.maxMembers} Members`}
          </Text>
        </View>
      </View>
      <TouchableOpacity 
        style={[
          styles.joinButton, 
          { backgroundColor: Colors[colorScheme ?? 'light'].primary }
        ]}
      >
        <Text style={styles.joinButtonText}>Join</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderCreateGroupModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isCreateGroupModalVisible}
      onRequestClose={() => setIsCreateGroupModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create New Group</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Group Name"
            value={newGroupName}
            onChangeText={setNewGroupName}
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Group Description"
            value={newGroupDesc}
            onChangeText={setNewGroupDesc}
            multiline
            numberOfLines={4}
          />
          
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setIsCreateGroupModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.createButton, 
                { backgroundColor: Colors[colorScheme ?? 'light'].primary }
              ]}
            >
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>Watch Together</Text>
        <TouchableOpacity 
          style={[
            styles.createGroupButton, 
            { backgroundColor: Colors[colorScheme ?? 'light'].primary }
          ]}
          onPress={() => setIsCreateGroupModalVisible(true)}
        >
          <FontAwesome name="plus" size={16} color="#FFF" />
          <Text style={styles.createGroupText}>Create Group</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {sampleGroups.map(renderGroupCard)}
      </ScrollView>

      {renderCreateGroupModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  createGroupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createGroupText: {
    color: '#FFF',
    marginLeft: 8,
    fontWeight: '600',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  groupCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  groupImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  groupDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  groupMemberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberText: {
    fontSize: 14,
    color: '#666',
  },
  joinButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  createButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});