let data = require("./data");
let { generateID } = require("./Utility");
class Controller {
  // agent section
  static getAgents() {
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }

  static getAgent(email) {
    return new Promise((resolve, reject) => {
      let objAgent = data.filter((agent) => agent.email === email)[0];
      if (objAgent) {
        resolve(objAgent);
      } else {
        reject({ Content: `No Agent with email ${email} found!!!` });
      }
    });
  }

  static DeleteAgent(email) {
    return new Promise((resolve, reject) => {
      let objAgent = data.filter((agent) => agent.email === email)[0];
      if (objAgent) {
        data = data.filter((agent) => agent.email !== email);
        resolve(data);
      } else {
        reject({ Content: `No Agent with email ${email} found!!!` });
      }
    });
  }

  static addAgent(agent) {
    return new Promise((resolve, reject) => {
      data = [...data, agent];
      resolve(data);
    });
  }
  static updateAgentAttribute(email, { type, content }) {
    return new Promise((resolve, reject) => {
      let agentIndex = data.findIndex((item) => item.email === email);
      if (agentIndex >= 0) {
        switch (type) {
          case "name": {
            data[agentIndex].name = content;
            resolve(data);
            break;
          }
          case "surname": {
            data[agentIndex].surname = content;
            resolve(data);
            break;
          }

          case "MessagesRead": {
            const msgId = content;
            let msgList = data[agentIndex].Messages;
            let msgObj = msgList.filter((msg) => msg.id === msgId);
            msgObj[0].read = true;
            resolve(data);
            break;
          }

          case "aboutUser": {
            data[agentIndex].aboutUser = content;
            resolve(data);
            break;
          }

          case "profileImage": {
            data[agentIndex].profileImage = content;
            resolve(data);
            break;
          }

          case "addSkill": {
            data[agentIndex].Profile.skills = [
              ...data[agentIndex].Profile.skills,
              content,
            ];
            resolve(data);
            break;
          }
          case "removeSkill": {
            data[agentIndex].Profile.skills = data[
              agentIndex
            ].Profile.skills.filter((item) => item !== content);
            resolve(data);
            break;
          }
          case "addAchievement": {
            data[agentIndex].Profile.achievements = [
              ...data[agentIndex].Profile.achievements,
              content,
            ];
            resolve(data);
            break;
          }
          case "removeAchievement": {
            data[agentIndex].Profile.achievements = data[
              agentIndex
            ].Profile.achievements.filter((item) => item !== content);
            resolve(data);
            break;
          }

          case "addGoal": {
            data[agentIndex].Profile.goals = [
              ...data[agentIndex].Profile.goals,
              content,
            ];
            resolve(data);
            break;
          }
          case "removeGoal": {
            data[agentIndex].Profile.goals = data[
              agentIndex
            ].Profile.goals.filter((item) => item !== content);
            resolve(data);
            break;
          }

          case "addPost": {
            data[agentIndex].PostsArray = [
              content,
              ...data[agentIndex].PostsArray,
            ];
            resolve(data);
            break;
          }

          case "removePost": {
            data[agentIndex].PostsArray = data[agentIndex].PostsArray.filter(
              (item) => item !== content
            ); //content = post id
            resolve(data);
            break;
          }
        }
      } else {
        reject({ Content: `No agent with email ${email} found` });
      }
    });
  }

  //status update /online/offline/typing
  static updateAgentStatus(objData) {
    return new Promise((resolve, reject) => {
      let agent = data.filter((item) => item.email === objData.email)[0];
      if (agent) {
        agent.status = objData.status;
        resolve(agent);
      } else {
        reject({ Content: `No Agent with email ${email} found!!!` });
      }
    });
  }

  //Message section
  static addMessageToAgentList(agent, objMessage) {
    agent.Messages = [...agent.Messages, objMessage];
  }
  //post request
  static sendMessage(objMessage) {
    const { from, to, message, time_stamp, read, delivered, imgArr } =
      objMessage;

    let newObj = {
      id: generateID(),
      from,
      to,
      message,
      time_stamp,
      read,
      delivered,
      imgArr,
    };

    let Person1 = data.filter((item) => item.email === from)[0];
    let Person2 = data.filter((item) => item.email === to)[0];

    this.addMessageToAgentList(Person1, newObj);
    this.addMessageToAgentList(Person2, newObj);
  }
}

module.exports = Controller;
