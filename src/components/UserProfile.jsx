import React, { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


import "./UserProfile.css";

function UserProfile({ username }) {
  const [userData, setUserData] = useState({});
  const [followersData, setFollowersData] = useState([]);
  const [languageData, setLanguageData] = useState([]);
  const [popularRepos, setPopularRepos] = useState([]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6384",
    "#36A2EB",
    "#FF00FF",
    "#FF4500",
  ];

  useEffect(() => {
    const userUrl = `https://api.github.com/users/${
      username || "gangotriyadav"
    }`;
    const followersUrl = `https://api.github.com/users/${
      username || "gangotriyadav"
    }/followers`;
    const reposUrl = `https://api.github.com/users/${
      username || "gangotriyadav"
    }/repos`;

    Promise.all([fetch(userUrl), fetch(followersUrl), fetch(reposUrl)])
      .then(async ([userResponse, followersResponse, reposResponse]) => {
        if (!userResponse.ok || !followersResponse.ok || !reposResponse.ok) {
          throw new Error("Failed to fetch data!");
        }
        const user = await userResponse.json();
        const followers = await followersResponse.json();
        const repos = await reposResponse.json();
        return { user, followers, repos };
      })
      .then(({ user, followers, repos }) => {
        setUserData(user);
        setFollowersData(followers);

        const languageCount = {};
        repos.forEach((repo) => {
          if (repo.language) {
            languageCount[repo.language] =
              (languageCount[repo.language] || 0) + 1;
          }
        });

        const languageDataArray = Object.entries(languageCount).map(
          ([language, count]) => ({
            name: language,
            value: count,
          })
        );
        setLanguageData(languageDataArray);

        const sortedRepos = repos
          .filter((repo) => repo.stargazers_count > 0)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5)
          .map((repo) => ({
            name: repo.name,
            stars: repo.stargazers_count,
          }));
        setPopularRepos(sortedRepos);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [username]);

  const handleFollow = () => {
    setFollowersData((prevData) => [
      ...prevData,
      { id: Date.now(), login: "New Follower" },
    ]);
  };

  return (
    <div className="container">
      <div className="dabba1">
        <div className="d1">
          <p className="p2">Repos:&nbsp;&nbsp; {userData.public_repos}</p>
          <div className="container1">
            <img
              id="b1"
              src="https://png.pngtree.com/png-clipart/20230805/original/pngtree-flat-vector-icon-in-pink-color-with-rounded-design-for-testing-task-vector-picture-image_9728856.png"
              height="50px"
              width="50px"
              alt="Repos Icon"
            />
          </div>
        </div>
        <div className="d1">
          <p className="p2">Followers: &nbsp;&nbsp;{userData.followers}</p>
          <div className="container1">
            <img
              src="https://cdn-icons-png.flaticon.com/128/681/681443.png"
              height="50px"
              width="50px"
              alt="Followers Icon"
            />
          </div>
        </div>
        <div className="d1">
          <p className="p2">Following:&nbsp;&nbsp; {userData.following}</p>
          <div className="container1">
            <img
              src="https://cdn-icons-png.flaticon.com/128/681/681443.png"
              height="50px"
              width="50px"
              alt="Following Icon"
            />
          </div>
        </div>
        <div className="d1">
          <p className="p2">ID:&nbsp;&nbsp; {userData.id}</p>
          <div className="container1">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAGd86ugeppr5KhoL-8DtTcq2LI0blaH2Uag&s"
              height="50px"
              width="50px"
              alt="ID Icon"
            />
          </div>
        </div>
      </div>

      <div className="dabba2">
        <div className="d5">
          <p className="p1">User:&nbsp;&nbsp; {userData.login}</p>
          <div className="box">
            <div className="box1">
              <img
                src={userData.avatar_url}
                alt="User Avatar"
                height="100px"
                width="100px"
                className="im"
              />
              <h4>Software Developer</h4>
            </div>
            <div className="dabba">
              <button className="btn1" onClick={handleFollow}>
                Follow
              </button>
            </div>
          </div>
          <div className="box2">
            <h4>Company: {userData.company || "N/A"}</h4>
            <h4>Location: {userData.location || "N/A"}</h4>
            <h4>Email: {userData.email || "N/A"}</h4>
          </div>
        </div>

        <div className="d5">
          <p className="p1">Followers:</p>
          <div className="followers-container">
            {followersData && followersData.length > 0 ? (
              followersData.map((follower) => (
                <div key={follower.id} className="follower">
                  <img
                    src={follower.avatar_url}
                    alt={`${follower.login}'s avatar`}
                    className="follower-avatar"
                  />
                  <a
                    href={follower.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="follower-link"
                  >
                    {follower.login}
                  </a>
                </div>
              ))
            ) : (
              <p className="no-followers">No Followers</p>
            )}
          </div>
        </div>
      </div>

      <div className="dabba3">
        <div className="d8">
          <h3>Languages Used in Repos</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={languageData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
            >
              {languageData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="d9">
          <h3>Most Popular Repositories</h3>
          <BarChart
            width={500}
            height={300}
            data={popularRepos}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stars">
              {popularRepos.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;



