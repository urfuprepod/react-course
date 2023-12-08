import React, {FC} from "react";
import { SortingOption, StringFilter, isStringFilter } from "../../../../types/post";

type PostSelectProps = {
    options: SortingOption[],
    updateSorting: (sort: StringFilter) => void;
    activeSorting: StringFilter | ''
}

const PostSelect: FC<PostSelectProps> = (props: PostSelectProps) => {
    const { options, updateSorting, activeSorting } = props;
    
    function update(value: string) {
        if (isStringFilter(value)) {
            updateSorting(value);
        }
    }
    
    return (
        <select
            value={activeSorting}
            onChange={(e) => update(e.target.value)}
        >
            <option disabled value="">
                Выберите из списка...
            </option>
            {
                // [{name: По заголовку, value: 'title'}]
                options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))
            }
        </select>
    );
};

export default PostSelect;
