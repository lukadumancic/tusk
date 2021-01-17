import * as React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  TextInput,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/globalStyles";
import { Picker } from "@react-native-picker/picker";

import {
  dataSelector,
  projectSprintsSelector,
  sprintTasksSelector,
  userSelector,
} from "../selectors";
import {
  createNew,
  deleteItem,
  editItem,
  setSelectedSprintId,
} from "../slices/dataSlices";

export default function Sprints() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newSprintTitle, setNewSprintTitle] = React.useState("");
  const [newSprintDescription, setNewSprintDescription] = React.useState("");
  const [newTaskTitle, setNewTaskTitle] = React.useState("");
  const [newTaskDescription, setNewTaskDescription] = React.useState("");
  const [newComment, setNewComment] = React.useState("");
  const dataState = useSelector(dataSelector);
  const userState = useSelector(userSelector);
  const sprints = useSelector(projectSprintsSelector);
  const tasks = useSelector(sprintTasksSelector);
  const [selectedAspect, setSelectedAspect] = React.useState("");

  const selectSprint = (id: number) => {
    dispatch(setSelectedSprintId(id));
  };

  const comment = (taskId) => {
    dispatch(
      createNew({
        route: "/comments",
        data: {
          content: newComment,
          taskId,
          userId: userState
        }}
      )
    )
  }

  const createSprint = () => {
    dispatch(
      createNew({
        route: "/sprints",
        data: {
          title: newSprintTitle,
          description: newSprintDescription,
          projectId: dataState.selectedProjectId,
        },
      })
    );
    setNewSprintTitle("");
    setNewSprintDescription("");
  };

  const createTask = () => {
    const sprintIndex = dataState.sprints.findIndex(
      (s) => s.id === dataState.selectedSprintId
    );
    const sprint = dataState.sprints[sprintIndex];
    let timeout = 0;
    if (sprint.aspects.length === 0) {
      dispatch(
        createNew({
          route: "/aspects",
          data: {
            sprintId: dataState.selectedSprintId,
          },
        })
      );
      timeout = 5000;
    }
    setTimeout(() => {
      const aspectId = dataState.sprints[sprintIndex].aspects[0].id;
      dispatch(
        createNew({
          route: "/tasks",
          data: {
            aspectId,
            title: newTaskTitle,
            description: newTaskDescription,
          },
        })
      );
      setNewTaskDescription("");
      setNewTaskTitle("");
    }, timeout);
  };

  const deleteSprint = (id: number) => {
    dispatch(deleteItem("/sprints/" + id));
  };

  const editSprint = (id: number) => {
    dispatch(
      editItem({
        route: "/sprints/" + id,
        data: {
          title: newSprintTitle,
          description: newSprintDescription,
        },
      })
    );
    setNewSprintTitle("");
    setNewSprintDescription("");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <Text style={styles.title}>Sprints</Text>
        {sprints.map((sprint: any) => {
          return (
            <>
              <View
                key={sprint.id}
                style={[
                  styles.item,
                  {
                    backgroundColor:
                      sprint.id === dataState.selectedSprintId
                        ? "#3e82f0"
                        : "#333",
                  },
                ]}
              >
                <Pressable
                  style={{ flex: 10 }}
                  onPress={() => selectSprint(sprint.id)}
                >
                  <Text style={styles.itemText}>{"Sprint " + sprint.id}</Text>
                  <Text style={styles.itemSubtext}>{sprint.description}</Text>
                </Pressable>
                <Pressable
                  style={{ flex: 1 }}
                  onPress={() => setModalVisible(true)}
                >
                  <Text>N</Text>
                </Pressable>
                <Pressable
                  style={{ flex: 1 }}
                  onPress={() => editSprint(sprint.id)}
                >
                  <Text>I</Text>
                </Pressable>
                <Pressable
                  style={{ flex: 1 }}
                  onPress={() => deleteSprint(sprint.id)}
                >
                  <Text>X</Text>
                </Pressable>
              </View>
              {sprint.id === dataState.selectedSprintId && (
                <View>
                  {tasks.map((task) => (
                    <View>
                      <View>
                        <Text>{task.title}</Text>
                        <Text>{task.description}</Text>
                      </View>
                      {task.comments.map((comment) => (
                        <View>
                          <Text>{comment.text}</Text>
                          <Text>{comment.createdAt.toString()}</Text>
                          <Text>{comment.user.username}</Text>
                        </View>
                      ))}
                      <View style={styles.input}>
                        <TextInput
                          placeholder="Comment"
                          style={styles.inputText}
                          onChangeText={(text) => setNewComment(text)}
                        />
                        <Pressable
                          style={styles.inputButton}
                          onPress={() => createComment()}
                        >
                          <Text style={{ color: "#FFF" }}>Create</Text>
                        </Pressable>
                      </View>
                    </View>
                  ))}

                  <Pressable
                    style={[styles.inputButton, { marginTop: 8, height: 40 }]}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text style={{ color: "#FFF" }}>Create task</Text>
                  </Pressable>
                </View>
              )}
            </>
          );
        })}
        <View style={styles.input}>
          <TextInput
            placeholder="Sprint title"
            style={styles.inputText}
            onChangeText={(text) => setNewSprintTitle(text)}
          />
          <Pressable style={styles.inputButton} onPress={createSprint}>
            <Text style={{ color: "#FFF" }}>Create</Text>
          </Pressable>
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Sprint description"
            style={styles.inputText}
            onChangeText={(text) => setNewSprintDescription(text)}
          />
        </View>
      </ScrollView>
      {modalVisible && (
        <View style={styles.centeredView}>
          <View animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Create new task</Text>
                <View style={styles.input}>
                  <TextInput
                    placeholder="Task title"
                    style={styles.inputText}
                    onChangeText={(text) => setNewTaskTitle(text)}
                  />
                  <Pressable style={styles.inputButton} onPress={createTask}>
                    <Text style={{ color: "#FFF" }}>Create</Text>
                  </Pressable>
                </View>
                <View style={styles.input}>
                  <TextInput
                    placeholder="Task description"
                    style={styles.inputText}
                    onChangeText={(text) => setNewTaskDescription(text)}
                  />
                </View>
                <Pressable
                  style={{
                    ...styles.openButton,
                    backgroundColor: "#2196F3",
                    marginTop: 12,
                    height: 40,
                    justifyContent: "center",
                    borderRadius: 8,
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
