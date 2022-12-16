import "./UserStoryCard.css"
import StoryLogo from "../../Assets/icons8-open-book-50.png";
import EffortLogo from "../../Assets/icons8-effort-50.png";
import Delete from "../../Assets/icons8-remove-24.png";

function UserStory() {


    return(
        <div className="user-story-card">
            <div className="story-row">
                <div>
                    <img src={StoryLogo} alt="open book" className="story-logo"/>
                    <h2 className="story-title">User Story Title 1</h2>
                </div>
                <div>
                    <h2 className="story-id">924</h2>
                </div>
            </div>
            <br/>
            <div className="story-row">
                <div>
                    <img src={EffortLogo} alt="effor logo" className="story-logo"/>
                    <h2 className="story-title">3 story points</h2>
                </div>
                <div>
                    <img src={Delete} alt="effort logo" className="story-logo-margin"/>
                </div>
            </div>
        </div>
    );
}

export default UserStory;