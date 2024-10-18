import { User } from "lucide-react";
import { useTranslation } from "next-i18next";
import { Fragment, useState } from "react";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

interface SearchUserProps {
  search?: (value: string) => void;
}

export default function SearchUser({ search }: SearchUserProps) {
  const { t } = useTranslation();

  const [inputFocus, setInputFocus] = useState(false);
  const [searchUser, setSearchUser] = useState("");

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSearchUser();
    }
  }

  function handleSearchUser() {
    return search?.(searchUser);
  }

  return (
    <Fragment>
      <div className="flex items-center gap-4 p-0 border-4 border-primary">
        <div
          className={`
            p-1.5 md:p-3 transition-all duration-300
            ${inputFocus ? "bg-primary-foreground" : "bg-primary"}
          `}
        >
          <User className="text-background" />
        </div>

        <Input
          placeholder={t("Home.search.placeholder")}
          className="w-full h-auto text-lg p-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          onChange={(element) => setSearchUser(element.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <Button
        type="button"
        className="h-auto text-lg text-background font-medium uppercase rounded-none bg-primary hover:bg-primary-foreground"
        onClick={handleSearchUser}
      >
        {t("Home.search.actionSearch")}
      </Button>
    </Fragment>
  );
}
