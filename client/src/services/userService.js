export default class UserService {
    constructor(request) {
        this.request = request;
    };

    // get user's skills
    getUserSkills() {
        return this.request.get("/api/v1/skills");
    };

    // add user's skills
    addUserSkill(payload) {
        return this.request.post("/api/v1/skills", payload);
    };

    // check user's auth status
    checkUserAuth() {
        return this.request.get("/api/v1/auth/check-auth");
    };

    // logout user
    logoutUser() {
        return this.request.get("/api/v1/auth/logout");
    };
};