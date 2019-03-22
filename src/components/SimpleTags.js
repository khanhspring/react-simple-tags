import React from 'react';

const ENTER_KEY = 13;
const COMMA_KEY = 188;
const BACKSPACE_KEY = 8;
const TAB_KEY = 9;

class SimpleTags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: this.props.initValue || [],
            value: ""
        };
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    handleKeyUp = (e) => {
        const key = e.keyCode;
        if (key === ENTER_KEY || key === COMMA_KEY || key === TAB_KEY) {
            if(!this.validateTag(this.state.value.trim())) {
                if (this.props.onValidationFail) {
                    this.props.onValidationFail();
                }
                return;
            }
            this.addTag();
            e.preventDefault();
        }
    };

    handleKeyDown = (e) => {
        const key = e.keyCode;
        if (key === BACKSPACE_KEY && !this.state.value) {
            this.editPrevTag();
        }
        if (key === ENTER_KEY || key === COMMA_KEY || key === TAB_KEY) {
            e.preventDefault();
        }
    };

    handleOnBlur = (e) => {
        if(this.validateTag(this.state.value.trim())) {
            this.addTag();
        }

        this.setState({
            value: ""
        });
    };

    removeTag = (index) => {
        const { tags } = this.state;
        tags.splice(index, 1);
        const newTags = [...tags];
        this.setState({
            tags: newTags
        });
        this.handleOnTagsChange(newTags);
    };

    handleOnTagsChange(newTags) {
        if (this.props.onValueChange) {
            this.props.onValueChange(newTags);
        }
    }

    addTag() {
        const { value } = this.state;
        let tag = value.trim();

        const { tags } = this.state;

        tag = tag.replace(/,/g, "");

        if (!tag) {
            return;
        }

        const newTags = [...tags, tag];
        this.setState({
            tags: newTags,
            value: ""
        });
        this.handleOnTagsChange(newTags);
    }

    validateTag(tag) {
        if (!this.props.regex) {
            return true;
        }

        return this.props.regex.test(tag);
    }

    editPrevTag() {
        let { tags } = this.state;

        const tag = tags.pop();

        this.setState({ tags, value: tag });
    }

    render() {
        const { tags, value } = this.state;
        return (
            <div className={'simple-tags-wrap' + (this.props.hasError ? ' has-error' : '')}>
                <div className="simple-tags">
                    {tags.map((tag, i) => (
                        <span key={tag + i} className="tag">
                            {tag}
                            <i onClick={(e) => this.removeTag(i)}>x</i>
                        </span>
                    ))}
                    <input
                        type="text"
                        placeholder="Add tag..."
                        value={value}
                        onChange={this.handleChange}
                        ref="tag"
                        className="simple-tags-input"
                        onKeyUp={this.handleKeyUp}
                        onKeyDown={this.handleKeyDown}
                        onBlur={this.handleOnBlur}
                    />
                </div>
                {
                    this.props.hasError && <span className="simple-tags-error">{this.props.errorMessage}</span>
                }

            </div>
        );
    }
}

export default SimpleTags;
