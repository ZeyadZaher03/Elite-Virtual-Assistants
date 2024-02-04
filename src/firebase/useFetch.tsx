import { useEffect, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { getData, setData } from ".";

interface InsertValueParams {
  ref: string;
  data: any;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useInsertValue = () => {
  const insertValue = useCallback(
    async ({ ref, data, onSuccess, onError }: InsertValueParams) => {
      try {
        if (ref && data) {
          toast("Inserting...");
          await setData({
            refPath: ref,
            data: data,
            onSave: () => {
              toast.dismiss();
              toast.success("Saved");
              onSuccess && onSuccess();
            },
            onError: (error) => {
              toast.dismiss();
              toast.error(`Error: ${error.message}`);
              onError && onError(error);
            },
          });
        }
      } catch (error: any) {
        toast.dismiss();
        toast.error(`Error: ${error?.message}`);
        onError && onError(error);
      }
    },
    []
  );

  return { insertValue };
};

// get data by ref
type RefPath = string;
type InitialData = any[];
type OnSuccessCallback<T> = (data: T) => void;
type OnErrorCallback = (error: any) => void;

export const useGetData = <T,>(
  refPath: RefPath,
  initialData: T,
  onSuccess: OnSuccessCallback<T>,
  onError: OnErrorCallback
) => {
  const [data, setData] = useState<T>(initialData);

  // Memoize callbacks only if they are used within getData
  const onSuccessCallback = useCallback(onSuccess, []);
  const onErrorCallback = useCallback(onError, []);

  const fetchData = useCallback(async () => {
    try {
      const fetchedData = await getData<T>(
        refPath,
        onSuccessCallback,
        onErrorCallback
      );
      if (fetchedData) {
        setData(fetchedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [refPath, onSuccessCallback, onErrorCallback]);

  useEffect(() => {
    fetchData();
  }, [fetchData, refPath]); // Execute fetchData when it changes or refPath changes

  return [data, fetchData] as const;
};

export const useGetDataByIds = ({
  refPath,
  ids,
}: {
  refPath: string;
  ids: string[];
}) => {
  ids;
  const [data, setData] = useState<any[]>([]); // Adjust the type accordingly
  const [fetchedData, getFetchedData] = useGetData(
    refPath,
    [],
    () => {},
    () => {}
  );

  const getData = useCallback(() => {
    if (!fetchedData) return;
    const filteredData = Object.entries(fetchedData)
      .filter(([idx, _]) => ids.includes(idx))
      .reduce((obj: any, [idx, item]) => {
        obj[idx] = item;
        return obj;
      }, {});
    return filteredData;
  }, [fetchedData, ids]);

  useEffect(() => setData(getData()), [fetchedData, getData]);

  return [data, getFetchedData];
};
