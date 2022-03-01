import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import { currentAbilityFetch, currentAbilityId } from "../atoms";
import { capitalize } from "../methods";

export default function Ability() {
  const { abilityId } = useParams();
  const setAbility = useSetAtom(currentAbilityId);
  const ability = useAtomValue(currentAbilityFetch);

  useEffect(() => {
    if (abilityId && !isNaN(Number(abilityId))) {
      setAbility(Number(abilityId));
    }
  }, [abilityId, setAbility]);

  if (!ability && ability !== 0) return null;

  return (
    <div>
      <h2>{capitalize(ability.name)}</h2>
    </div>
  );
}
