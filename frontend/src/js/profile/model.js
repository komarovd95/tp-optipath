export class ProfileLink {
    constructor(name, displayName, component) {
        this.name = name;
        this.displayName = displayName;
        this.component = component;

        this.hasView = this.hasView.bind(this);
    }

    hasView() {
        return !!this.component;
    }
}