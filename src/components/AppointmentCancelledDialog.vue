<template lang="">
    <AlertDialog  :open="dialogState">
      <AlertDialogContent >
        <AlertDialogHeader >
          <AlertDialogTitle>Appointment alert!</AlertDialogTitle>
          <AlertDialogDescription>
            One of your appointments has been cancelled. Please check your email for more information.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>
            <button @click="handleOkClick">OK</button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </template>
  
<script setup lang="ts">
import { InvalidateQueryFilters, useQueryClient } from '@tanstack/vue-query';
import { dialogState, openDialog, closeDialog } from '../stateStores/cancelledAppointmentDialog.ts'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { MaybeRefDeep } from 'node_modules/@tanstack/vue-query/build/modern/types';

const queryClient = useQueryClient();

const handleOkClick = () => {
  console.log('OK clicked')
  queryClient.invalidateQueries(['appointments'] as MaybeRefDeep<InvalidateQueryFilters>);
  queryClient.invalidateQueries(['timeslots'] as MaybeRefDeep<InvalidateQueryFilters>);
  closeDialog();
};
</script>
  
<style lang="">
  
  </style>
  