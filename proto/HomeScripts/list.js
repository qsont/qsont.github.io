export {passPendingActs};

const activities = [
    {title: "Activity 1", link: "activity1.html"},
    {title: "Activity 2", link: "activity2.html"},
    {title: "Activity 3", link: "activity3.html"},
    {title: "Activity 4", link: "activity1.html"},
    {title: "Activity 5", link: "activity2.html"},
];

if (!JSON.parse(localStorage.getItem("data"))) {
    localStorage.setItem("data", JSON.stringify([]));
}

const list = document.getElementById("list")

let acts = activities, pending = acts.length;

    acts.forEach((act, i=0) => {
        const item = document.createElement("li");
        const box = document.createElement("div");
        const title = document.createElement("div");
        const rightPanel = document.createElement("div");
        const score = document.createElement("span");
        const start = document.createElement("button");

        box.classList.add("act-item");
        title.classList.add("act-title");
        rightPanel.classList.add("right-panel");

        start.innerHTML = "Start";
        start.classList.add("start");

        title.innerHTML = act.title;

        let data = JSON.parse(localStorage.getItem("data"));
        if (data.length !== activities.length) {
            data.push({"act": title.innerHTML, "score": 0, "total": 0, "completed": false});
            localStorage.setItem("data", JSON.stringify(data));
            console.log(data)   
        }

        if (!data[i].score) {
            score.innerHTML = "Not Completed";
        }
        else {
            score.innerHTML = `Score: ${data[i].score}/${data[i].total}`;
            pending--;
        }

        rightPanel.appendChild(score);
        rightPanel.appendChild(start);
        box.appendChild(title);
        box.appendChild(rightPanel);
        item.appendChild(box);
        list.appendChild(item);

        start.addEventListener("click", () => {
            document.location.href = `./Activity/${act.link}`;
        });

    });

let passPendingActs = new Promise(function(r, e) {
    r(pending);
    e(new Error("Failed to get total number of activities"));
});