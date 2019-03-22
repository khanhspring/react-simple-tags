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
            regexValid: true,
            regexErrorMessage: this.props.regexErrorMessage || 'Value is invalid',
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
                this.setState({regexValid: false});
                return;
            }
            this.addTag();
            e.preventDefault();
        }
        this.setState({regexValid: true});
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
            value: "",
            regexValid: true
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

    focusOnTagInput = () => {
        if (this.tagInput) {
            this.tagInput.focus();
        }
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
                <div className="simple-tags" onClick={this.focusOnTagInput}>
                    {tags.map((tag, i) => (
                        <span key={tag + i} className="tag">
                            {tag}
                            <i onClick={(e) => this.removeTag(i)}>x</i>
                        </span>
                    ))}
                    <div className="simple-tags-input-wrap">
                        <input
                            ref={(input) => { this.tagInput = input; }}
                            type="text"
                            placeholder={this.props.placeholder || 'Add a tag...'}
                            value={value}
                            onChange={this.handleChange}
                            className="simple-tags-input"
                            onKeyUp={this.handleKeyUp}
                            onKeyDown={this.handleKeyDown}
                            onBlur={this.handleOnBlur}
                        />
                        {
                            !this.state.regexValid &&
                            <div className="simple-tags-warning">
                                <span>{this.state.regexErrorMessage}</span>
                            </div>
                        }
                    </div>
                </div>
                {
                    this.props.hasError && <span className="simple-tags-error">{this.props.errorMessage}</span>
                }
            </div>
        );
    }
}

export default SimpleTags;
