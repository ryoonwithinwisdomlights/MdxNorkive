const TagItemMini = ({
  tags,
  className,
}: {
  tags: string[];
  className: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      {tags.slice(0, 3).map((tag, index) => (
        <span
          key={index}
          className={`px-2 py-1  rounded-md text-xs ${className}`}
        >
          {tag}
        </span>
      ))}
      {tags.length > 3 && <span className="text-xs">+{tags.length - 3}</span>}
    </div>
  );
};

export default TagItemMini;
